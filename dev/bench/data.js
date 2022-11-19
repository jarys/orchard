window.BENCHMARK_DATA = {
  "lastUpdate": 1668837687921,
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
          "id": "3faab98e9e82618a0f2d887054e9e28b0f7947dd",
          "message": "Merge pull request #342 from zcash/release-0.2.0\n\nRelease 0.2.0",
          "timestamp": "2022-06-24T17:23:22+01:00",
          "tree_id": "c1dda5f72c5100a527057bd293cc8c818e944193",
          "url": "https://github.com/jarys/orchard/commit/3faab98e9e82618a0f2d887054e9e28b0f7947dd"
        },
        "date": 1657117452391,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 4122321483,
            "range": "± 98082735",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 4135207486,
            "range": "± 18824756",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 5882557765,
            "range": "± 14730219",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 7649428390,
            "range": "± 25195787",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 33885297,
            "range": "± 474090",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 33839371,
            "range": "± 629193",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 38171740,
            "range": "± 1624359",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 42017359,
            "range": "± 701483",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1239654,
            "range": "± 1006",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 158001,
            "range": "± 66",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1237099,
            "range": "± 897",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 157680153,
            "range": "± 26661",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 24383512,
            "range": "± 86700",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 2764895,
            "range": "± 1321",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 24299978,
            "range": "± 4725",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 2720924,
            "range": "± 1409",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 121868573,
            "range": "± 56341",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 13755316,
            "range": "± 4041",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 121416971,
            "range": "± 42427",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 13538144,
            "range": "± 17047",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 243730265,
            "range": "± 401935",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 27493330,
            "range": "± 596779",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 242824622,
            "range": "± 48989",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 27064381,
            "range": "± 6211",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 579636,
            "range": "± 182",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 638575,
            "range": "± 193",
            "unit": "ns/iter"
          }
        ]
      },
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
          "id": "d05b6cee9df7c4019509e2f54899b5979fb641b5",
          "message": "Merge pull request #362 from zcash/batch-scanner-improvements\n\nBatch scanner improvements",
          "timestamp": "2022-10-20T09:30:49-06:00",
          "tree_id": "45c0b7bd0fb04c9de8adc3078a3e29e8956c28fe",
          "url": "https://github.com/jarys/orchard/commit/d05b6cee9df7c4019509e2f54899b5979fb641b5"
        },
        "date": 1668837686892,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 4165407363,
            "range": "± 48712971",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 4123582643,
            "range": "± 4798680",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 5886510548,
            "range": "± 13398618",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 7643733219,
            "range": "± 15717765",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 33811362,
            "range": "± 229471",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 33649988,
            "range": "± 1103935",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 37951554,
            "range": "± 136011",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 41826924,
            "range": "± 422295",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1891176,
            "range": "± 4614",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 156363,
            "range": "± 87",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1887982,
            "range": "± 683",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 1647349298,
            "range": "± 2523603",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 19980444,
            "range": "± 7174",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 2687568,
            "range": "± 1922",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 19957835,
            "range": "± 8168",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 2645874,
            "range": "± 1626",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 99765176,
            "range": "± 38130",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 13309658,
            "range": "± 7717",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 99655813,
            "range": "± 37847",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 13099977,
            "range": "± 6563",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 199472065,
            "range": "± 53920",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 26591624,
            "range": "± 11982",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 199248166,
            "range": "± 289836",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 26176795,
            "range": "± 13390",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 579483,
            "range": "± 1367",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 637863,
            "range": "± 523",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}