const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, index}) {
    // Confirm we are getting our bread data in the terminal.
    // console.log(bread.name)
      return (
        <Default>
  <h3>{bread.name}</h3>
  <p>{bread.getBakedBy()}</p>      
  <p>
    ...and it
    {
      bread.hasGluten
      ? <span> <u>does</u> </span>
      : <span> <u>does NOT</u> </span>
    }
    have gluten.
  </p>
  <img src={bread.image} alt={bread.name} />
  <br />
  <a href={`/breads/`}><button>Home</button></a>
  <br />
  <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
  <form action={`/breads/${bread.id}?_method=DELETE`} method='POST'>
    <input type='submit' value='DELETE'/>
  </form>
</Default>
      )
  }

module.exports = Show


