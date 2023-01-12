exports.handler = async (event) => {
    console.log(event.Records[0].Sns)
    return {
      message: 'req processed'
    }
}