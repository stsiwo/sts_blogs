
describe('nested Promise test', () => {

  //test('sample', async () => {
  //  const myPromise = new Promise((res, rej) => {
  //    rej('error')
  //  })
  //    .then((data) => {
  //    })
  //    .catch((data) => {
  //      console.log(data)
  //      return new Promise((res, rej) => {
  //        console.log('inner promise')
  //        rej('success')
  //      })
  //    })
  //    .catch((data) => {
  //      console.log('second catch clause') 
  //      console.log(data)
  //      return data
  //    })

  //  const result = await myPromise
  //  console.log(result)
  //})

  test('prototype', async () => {

    function request(content: string, isRes: boolean): Promise<string> {
      return new Promise((res, rej) => {
        console.log('1')
        rej(content)
      })
        .then(data => {
        
        })
        .catch(error => {
          
          console.log('2')
          return new Promise((res, rej) => {
            console.log('3')
            if (isRes) res(content) 
            else rej('error')
          })
            .then(data => {
              console.log('4-res')
              return request(content, false)
            })
            .catch(error => {
              console.log('4-rej')
              return error
            })
          
        })
    }

    const result = await request('value', true)
    console.log(result)

  })

})
