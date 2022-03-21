window.BENCHMARK_DATA = {
  "lastUpdate": 1647853171379,
  "repoUrl": "https://github.com/jarys/orchard",
  "entries": {
    "Orchard Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "jack@electriccoin.co",
            "name": "str4d",
            "username": "str4d"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "0ee6cf894ff73a83e97d4f7b5cf0066083293b2c",
          "message": "Merge pull request #296 from zcash/commitivk-identity-error\n\nspec.rs: Check that commit_ivk returns a nonzero base.",
          "timestamp": "2022-03-17T22:27:27Z",
          "tree_id": "f586c99e272ff2ab2c32cfc455079f1e9955c57c",
          "url": "https://github.com/jarys/orchard/commit/0ee6cf894ff73a83e97d4f7b5cf0066083293b2c"
        },
        "date": 1647853169981,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 4104214043,
            "range": "± 282124953",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 4108072983,
            "range": "± 15979112",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 5880852343,
            "range": "± 11320534",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 7655433134,
            "range": "± 17087557",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 32139246,
            "range": "± 436200",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 31913994,
            "range": "± 210356",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 36133245,
            "range": "± 671975",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 39190734,
            "range": "± 390253",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1033034,
            "range": "± 353",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 132530,
            "range": "± 123",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1029866,
            "range": "± 656",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 131555776,
            "range": "± 111360",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 20338034,
            "range": "± 9234",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 2336940,
            "range": "± 337",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 20277018,
            "range": "± 4990",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 2301394,
            "range": "± 666",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 101687397,
            "range": "± 57270",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 11632403,
            "range": "± 6735",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 101318603,
            "range": "± 24471",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 11451651,
            "range": "± 6045",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 203337152,
            "range": "± 51549",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 23261237,
            "range": "± 21348",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 202637646,
            "range": "± 49153",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 22878645,
            "range": "± 20448",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 493380,
            "range": "± 1482",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 543152,
            "range": "± 376",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}