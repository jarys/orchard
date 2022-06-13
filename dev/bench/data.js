window.BENCHMARK_DATA = {
  "lastUpdate": 1655116823121,
  "repoUrl": "https://github.com/jarys/orchard",
  "entries": {
    "Orchard Benchmarks": [
      {
        "commit": {
          "author": {
            "email": "ewillbefull@gmail.com",
            "name": "ebfull",
            "username": "ebfull"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "93ad4a6952e41465ea4e046d0a54deef54d8731d",
          "message": "Merge pull request #318 from zcash/str4d/circuit-review\n\nChanges from circuit review",
          "timestamp": "2022-05-05T09:24:12-06:00",
          "tree_id": "708d87a26bba0ec133046557b4f12258f212b8f2",
          "url": "https://github.com/jarys/orchard/commit/93ad4a6952e41465ea4e046d0a54deef54d8731d"
        },
        "date": 1651767658652,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 5350553402,
            "range": "± 88336121",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 5466565808,
            "range": "± 155458958",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 7817229052,
            "range": "± 237960372",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 10035757431,
            "range": "± 138018230",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 42873672,
            "range": "± 2586920",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 40945192,
            "range": "± 2030421",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 49051455,
            "range": "± 2969965",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 50924140,
            "range": "± 3773255",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "36d263fb19cf4b88200617c4bbe7a91b66bf4869",
          "message": "Merge pull request #321 from zcash/protocol-rule-links\n\nAdd protocol rule links for the Orchard circuit constraints",
          "timestamp": "2022-05-27T17:03:05+01:00",
          "tree_id": "fecb70418689fa5f4048eb6b81ddc8953043125d",
          "url": "https://github.com/jarys/orchard/commit/36d263fb19cf4b88200617c4bbe7a91b66bf4869"
        },
        "date": 1655116820487,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 5375710368,
            "range": "± 42209007",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 5385414547,
            "range": "± 31918977",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 7698764831,
            "range": "± 48818028",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 9952618626,
            "range": "± 36121584",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 44979882,
            "range": "± 1542028",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 44764914,
            "range": "± 1751391",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 49298798,
            "range": "± 1379663",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 55217254,
            "range": "± 2036882",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1400871,
            "range": "± 67687",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 174907,
            "range": "± 6655",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1377190,
            "range": "± 40862",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 183846176,
            "range": "± 4861034",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 27431751,
            "range": "± 1019879",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 3157256,
            "range": "± 106606",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 27076141,
            "range": "± 1048459",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 3119542,
            "range": "± 119851",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 137149712,
            "range": "± 4807375",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 15729267,
            "range": "± 621772",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 135766958,
            "range": "± 2548061",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 15328215,
            "range": "± 496975",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 274625031,
            "range": "± 4620219",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 31340981,
            "range": "± 896137",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 273056109,
            "range": "± 4476953",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 30671498,
            "range": "± 747719",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 668240,
            "range": "± 28215",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 724593,
            "range": "± 21248",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}