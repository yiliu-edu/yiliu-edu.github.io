"""Impact scan: which learning assets does a release touch?

Deterministic first pass of the content-currency workflow. It matches each structured
release item (from the intake step) against the content library two ways:
  1. tag match   - the asset's feature tags overlap the release item's features
  2. text match  - a release keyword appears in the asset body (catches untagged mentions)
Every flag then goes to the LLM impact check (skills/02-impact-check.md) and a human.

Usage: python3 flag_impacted.py content/library.json content/release-4.2.json > sample-run/impact-report.json
"""
import json, re, sys

SEVERITY = {  # change type -> how likely a customer follows wrong instructions
    "rename_move": "high", "default": "high", "behavior": "medium",
    "new_feature": "medium", "performance": "low",
}
INSTRUCTIONAL = {"help_article", "in_app_guide", "course_lesson", "job_aid", "workshop_module"}

def scan(library, release):
    flags = []
    for asset in library:
        text = "\n".join(asset.get("body", [])) + " " + asset.get("objective", "")
        for item in release["items"]:
            tag_hit = sorted(set(asset["features"]) & set(item["features"]))
            text_hits = [k for k in item["keywords"] if re.search(r"\b" + re.escape(k) + r"s?\b", text, re.I)]
            if not tag_hit and not text_hits:
                continue
            lines = [l for l in asset.get("body", []) if any(re.search(r"\b" + re.escape(k) + r"s?\b", l, re.I) for k in item["keywords"])]
            sev = SEVERITY.get(item["change_type"], "medium")
            if asset["type"] not in INSTRUCTIONAL and sev == "high":
                sev = "medium"
            flags.append({
                "asset": asset["id"], "title": asset["title"], "owner": asset["owner"],
                "release_item": item["id"], "change_type": item["change_type"],
                "match": "tag+text" if tag_hit and text_hits else ("tag" if tag_hit else "text"),
                "severity": sev, "evidence_lines": lines,
            })
    order = {"high": 0, "medium": 1, "low": 2}
    return sorted(flags, key=lambda f: (order[f["severity"]], f["asset"]))

if __name__ == "__main__":
    lib = json.load(open(sys.argv[1])); rel = json.load(open(sys.argv[2]))
    flags = scan(lib, rel)
    json.dump({"release": rel["release"], "assets_scanned": len(lib), "flags": flags}, sys.stdout, indent=2, ensure_ascii=False)
    print(f"\n{len(flags)} flags across {len({f['asset'] for f in flags})} of {len(lib)} assets", file=sys.stderr)
