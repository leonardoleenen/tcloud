

const fetchMeta = () => {
  fetch('https://us-central1-tcloud-261610.cloudfunctions.net/getMeta/')
    .then(response => {
      response.text().then(data => {
        fetch('https://us-central1-tcloud-261610.cloudfunctions.net/getDocumentsPendingToProcess ')
          .then(resPendingDocuments => {
            resPendingDocuments.text().then(pendingDocuments => {
              postMessage({
                type: "DOCUMENT_PROCESSED_LIST",
                runAt: new Date().getTime(),
                value: JSON.parse(data)
              })
              postMessage({
                type: "DOCUMENT_IN PROGRESS_LIST",
                runAt: new Date().getTime(),
                value: JSON.parse(pendingDocuments)
              })
              setTimeout( () => fetchMeta(), 10000)
            })
          })
      })
    })
  }

fetchMeta()

