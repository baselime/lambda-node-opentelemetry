exports.handler = async (event) => {
    console.log(event)
    return {
      message: 'req processed'
    }
}