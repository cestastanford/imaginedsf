/*
*   Enables submit functionality on "Search an address" bars.
*/

const handleSubmit = e => {
    
    e.preventDefault()
    const address = e.target.querySelector('input[type="text"]').value
    const hashState = encodeURI(JSON.stringify({ address }))
    window.location = '/maps/#' + hashState
    if (window.location.pathname.indexOf('/maps') > -1) location.reload()

}

document.addEventListener('DOMContentLoaded', () => {
    
    const elements = [ ...document.querySelectorAll('form.search-an-address') ]
    elements.forEach(e => e.addEventListener('submit', handleSubmit))

})
