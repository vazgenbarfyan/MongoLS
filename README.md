# Mongo Local

MongoDB working locally with the help of Local Storage. 

![MongoDB Logo](./markdownphotos/mongolocal.png)

## API reference 

### Methods

- setItem(Item)
- Add item to the storage. The passed argument has to be and object
- getItem(Id)
- Retrieve the item with specified ID. The passed argument has to be an integer or string.
- removeItem(Id)
- Remove the item from the database. The passed argument has to be an integer or string.
- find(query)
- Check to see if the requested query has any matches. Return the array of found items from the db.
- into(range, number)
- Check to see if the specified number is within the range. Range is an array of length two containing start and end of the range. Second attribute is the integer to be checked.
