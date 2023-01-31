const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
    // Confirm we are getting our bread data in the terminal.
    // console.log(bread.name)
      return (
        <Default>
  <h3>{bread.name}</h3>
  <p>Baked by {bread.baker}</p>
  <img src={bread.image} alt={bread.name} />
  <p>
    and it
    {
      bread.hasGluten
      ? <span> does </span>
      : <span> does NOT </span>
    }
    have gluten.
  </p>
  <li>
    <a href="/breads">Go home</a>
  </li>
  <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
  <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
    <input type='submit' value="DELETE"/>
  </form>
</Default>
      )
  }

module.exports = Show
