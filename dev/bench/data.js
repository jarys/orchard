window.BENCHMARK_DATA = {
  "lastUpdate": 1648819997653,
  "repoUrl": "https://github.com/jarys/orchard",
  "entries": {
    "Orchard Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "kris@nutty.land",
            "name": "Kris Nuttycombe",
            "username": "nuttycom"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "420d600f0e8276559c50710faf7730ebab35dbec",
          "message": "Merge pull request #305 from zcash/fvk-scope\n\nAdd explicit scoping for viewing keys and addresses",
          "timestamp": "2022-03-30T08:37:20-06:00",
          "tree_id": "4958705fc0ecef315e6352013db8b2c344659784",
          "url": "https://github.com/jarys/orchard/commit/420d600f0e8276559c50710faf7730ebab35dbec"
        },
        "date": 1648819994818,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 4526275698,
            "range": "± 7963668",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 4525821104,
            "range": "± 9245325",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 6465516835,
            "range": "± 18688680",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 8408184675,
            "range": "± 17153597",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 36548377,
            "range": "± 188098",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 36538008,
            "range": "± 363568",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 40819158,
            "range": "± 323362",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 45011124,
            "range": "± 301626",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1233281,
            "range": "± 9361",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 157948,
            "range": "± 116",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1228828,
            "range": "± 868",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 159961312,
            "range": "± 336128",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 24243807,
            "range": "± 34550",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 2761451,
            "range": "± 1784",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 24186736,
            "range": "± 71223",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 2716398,
            "range": "± 3415",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 121164085,
            "range": "± 135997",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 13737008,
            "range": "± 11327",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 120854168,
            "range": "± 352525",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 13517652,
            "range": "± 8962",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 242234448,
            "range": "± 84166",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 27467293,
            "range": "± 145991",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 241723990,
            "range": "± 81576",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 27024796,
            "range": "± 12051",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 578323,
            "range": "± 270",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 635402,
            "range": "± 337",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}