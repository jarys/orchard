window.BENCHMARK_DATA = {
  "lastUpdate": 1647442953000,
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
          "id": "3ddf6c49f7484ed1295bd5351317bbfe49e14472",
          "message": "Merge pull request #293 from zcash/merge-non-consensus-changes-2\n\nMerge non-consensus changes again",
          "timestamp": "2022-02-28T21:17:26Z",
          "tree_id": "cfebc5dadd5f46d579914daad36e9fd8d69a1101",
          "url": "https://github.com/jarys/orchard/commit/3ddf6c49f7484ed1295bd5351317bbfe49e14472"
        },
        "date": 1647442952099,
        "tool": "cargo",
        "benches": [
          {
            "name": "proving/bundle/1",
            "value": 4093564956,
            "range": "± 326643153",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/2",
            "value": 4091587957,
            "range": "± 10907001",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/3",
            "value": 5870272821,
            "range": "± 20800434",
            "unit": "ns/iter"
          },
          {
            "name": "proving/bundle/4",
            "value": 7647384199,
            "range": "± 17875677",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/1",
            "value": 31817435,
            "range": "± 991129",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/2",
            "value": 31920238,
            "range": "± 202675",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/3",
            "value": 35675974,
            "range": "± 819056",
            "unit": "ns/iter"
          },
          {
            "name": "verifying/bundle/4",
            "value": 39318241,
            "range": "± 410224",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/valid",
            "value": 1034756,
            "range": "± 11653",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/invalid",
            "value": 132598,
            "range": "± 42",
            "unit": "ns/iter"
          },
          {
            "name": "note-decryption/compact-valid",
            "value": 1031491,
            "range": "± 585",
            "unit": "ns/iter"
          },
          {
            "name": "compact-note-decryption/invalid",
            "value": 136890743,
            "range": "± 53741",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/10",
            "value": 20388386,
            "range": "± 5682",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/10",
            "value": 2339909,
            "range": "± 572",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/10",
            "value": 20304367,
            "range": "± 5096",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/10",
            "value": 2304642,
            "range": "± 1375",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/50",
            "value": 101869553,
            "range": "± 23467",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/50",
            "value": 11642666,
            "range": "± 4446",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/50",
            "value": 101448887,
            "range": "± 30604",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/50",
            "value": 11462214,
            "range": "± 8006",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/valid/100",
            "value": 203731716,
            "range": "± 58287",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/invalid/100",
            "value": 23264726,
            "range": "± 6190",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-valid/100",
            "value": 202899732,
            "range": "± 78527",
            "unit": "ns/iter"
          },
          {
            "name": "batch-note-decryption/compact-invalid/100",
            "value": 22910524,
            "range": "± 9952",
            "unit": "ns/iter"
          },
          {
            "name": "derive_fvk",
            "value": 494239,
            "range": "± 2356",
            "unit": "ns/iter"
          },
          {
            "name": "default_address",
            "value": 541931,
            "range": "± 274",
            "unit": "ns/iter"
          }
        ]
      }
    ]
  }
}