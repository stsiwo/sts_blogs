
describe('nested Promise test', () => {

  //test('sample', async () => {
  //  const myPromise = new Promise((res, rej) => {
  //    rej('error')
  //  })
  //    .then((data) => {
  //    })
  //    .catch((data) => {
  //      return new Promise((res, rej) => {
  //        rej('success')
  //      })
  //    })
  //    .catch((data) => {
  //      return data
  //    })

  //  const result = await myPromise
  //})

  test('prototype', async () => {

    function request(content: string, isRes: boolean): Promise<string> {
      return new Promise((res, rej) => {
        rej(content)
      })
        .then(data => {
        
        })
        .catch(error => {
          
          return new Promise((res, rej) => {
            if (isRes) res(content) 
            else rej('error')
          })
            .then(data => {
              return request(content, false)
            })
            .catch(error => {
              return error
            })
          
        })
    }

    const result = await request('value', true)

  })

})
