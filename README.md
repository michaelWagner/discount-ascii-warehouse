Discount Ascii Warehouse
====

This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯\_(ツ)_/¯`, in a wide variety of font sizes. The homepage displays a list of products for people to browse.

Features
----

- Products are displayed in a grid.
- The user has the option to sort the products in ascending or descending order. Can sort by "date", "size/product", "price" or "id".
- Each product has :
  - A "size" field, which is the product's font-size (in pixels).The faces are displayed in their correct size, giving customers a realistic impression of what they're buying.
  - A "price" field, in cents. This should be formatted as dollars like `$3.51`.
  - A "date" field, which is the date the product was added to the catalog. Dates are displayed in relative time (eg. "3 days ago") unless they are older than 1 week, in which case the full date should be displayed.
- The product grid automatically loads more items as the user scrolls down.
- Our product database is under high load due to growing demand for ascii, so we display an animated "loading..." message while the user waits.
- To improve the user's experience, we always pre-emptively fetch the next batch of results in advance, making use of idle-time. They still are not displayed until the user has scrolled to the bottom of the product grid.
- When the user reaches the end and there are no more products to display, show the message "~ end of catalogue ~".

### Ads features

- After every 20 products we need to insert an advertisement from one of our sponsors. Uses the same markup as the advertisement in the header, and randomly generates the `?r` query param each time an ad is displayed.
- Ads should be randomly selected, but a user must never see the same ad twice in a row.

Products API
----

- The basic query looks like this: `/api/products`
- The response format is newline-delimited JSON.
- To get a larger results set use the `limit` parameter, eg: `/api/products?limit=100`
- To paginate results use the `skip` parameter, eg: `/api/products?limit=15&skip=30` (returns 15 results starting from the 30th).
- To sort results use the `sort` parameter, eg: `/api/products?sort=price`. Valid sort values are `price`, `size` and `id`.

FAQ
----

### How do I start the app?

- Start with `npm start`
- Navigate to http://localhost:3000/
