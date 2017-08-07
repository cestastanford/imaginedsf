/*
*   Sets up click listeners on parent narratives to control hierarchical
*   list.
*/

const enableInteractivity = element => {

    const activeListItem = element.querySelector('.is-active')
    const childLists = [ ...element.querySelectorAll('ul ul') ]
    const childListLabels = childLists.map(list => {

        const labels = [ ...list.parentElement.querySelectorAll('a') ]
        return labels.filter(label => label.parentElement === list.parentElement)[0]

    })

    childListLabels.forEach((label, i) => {

        label.addEventListener('click', e => {

            e.preventDefault()
            label.parentElement.classList.toggle('closed')

        })

        if (childLists[i].contains(activeListItem)) {

            label.parentElement.classList.add('open')

        }

    })

}


/*
*   Enables interactivity upon completion of DOM loading.
*/

document.addEventListener('DOMContentLoaded', () => {

    const QUERY_STRING = 'aside.menu'
    const element = document.querySelector(QUERY_STRING)
    if (element) enableInteractivity(element)

})
