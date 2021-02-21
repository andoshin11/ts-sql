import * as schema from './schema'

export type DB = {
  dialect: 'postgres';
  schema: {
    actor: schema.actor
    actor_info: schema.actor_info
    address: schema.address
    category: schema.category
    city: schema.city
    country: schema.country
    customer: schema.customer
    customer_list: schema.customer_list
    film: schema.film
    film_actor: schema.film_actor
    film_category: schema.film_category
    film_list: schema.film_list
    inventory: schema.inventory
    language: schema.language
    nicer_but_slower_film_list: schema.nicer_but_slower_film_list
    payment: schema.payment
    rental: schema.rental
    sales_by_film_category: schema.sales_by_film_category
    sales_by_store: schema.sales_by_store
    staff: schema.staff
    staff_list: schema.staff_list
    store: schema.store
  }
}


export type query1 = "SELECT users.firstName, users.age, users.sex, team.name FROM users INNER JOIN teams AS team ON users.teamId = team.id"

export type query2 = "SELECT * FROM users INNER JOIN teams ON users.teamId = teams.id"

export type query3 = "SELECT * FROM users"

export type Q1 = 'SELECT first_name FROM customer;'

export type Q2 = 'SELECT first_name, last_name, email FROM customer;'

export type Q3 = 'SELECT * FROM customer;'

export type Q4 = "SELECT first_name, last_name AS surname FROM customer;"

export type Q5 = "SELECT first_name, last_name surname FROM customer;"

export type Q6 = "SELECT first_name || ' ' || last_name AS full_name FROM customer;"

export type Q7 = 'SELECT first_name, last_name FROM customer ORDER BY first_name ASC;'

export type Q8 = 'SELECT first_name, LENGTH(first_name) len FROM customer ORDER BY len DESC;'

export type Q9 = 'SELECT DISTINCT release_year FROM film;'

export type Q10 = 'SELECT DISTINCT release_year, rental_rate FROM film;'

export type Q11 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie';"

export type Q12 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' AND last_name = 'Rice';"

export type Q13 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' OR last_name = 'Rice';"

export type Q14 = "SELECT last_name, first_name FROM customer WHERE first_name IN ('Ann','Anne','Annie');"

export type Q15 = 'SELECT film_id, title, release_year FROM film ORDER BY film_id LIMIT 4 OFFSET NULL;'

export type Q16 = 'SELECT film_id, title, release_year FROM film ORDER BY film_id LIMIT 4 OFFSET 3;'

export type Q17 = "SELECT last_name, first_name FROM customer WHERE first_name = 'Jamie' OR last_name = 'Rice' LIMIT 4 OFFSET 3;"

export type Q18 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id IN (1, 2) ORDER BY return_date DESC;"

export type Q19 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id NOT IN (1, 2);"

export type Q20 = "SELECT customer_id, rental_id, return_date FROM rental WHERE customer_id <> 1 AND customer_id <> 2;"

export type Q21 = "SELECT customer_id, payment_id, amount FROM payment WHERE amount BETWEEN 8 AND 9;"

export type Q22 = "SELECT customer_id, payment_id, amount FROM payment WHERE amount NOT BETWEEN 8 AND 9;"

export type Q23 = "SELECT first_name, last_name FROM customer WHERE first_name LIKE 'Jen%';"

export type Q24 = "SELECT first_name, last_name FROM customer WHERE first_name NOT LIKE 'Jen%';"

export type Q25 = "SELECT first_name, last_name FROM customer WHERE first_name ILIKE 'Jen%';"

export type Q26 = "SELECT first_name, last_name FROM customer WHERE first_name NOT ILIKE 'Jen%';"

export type Q27 = "SELECT customer.first_name, customer.last_name, rental.rental_date FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id;"

export type Q28 = "SELECT customer.first_name, customer.last_name, rental.rental_date, rental.return_date, film.title film_title FROM rental INNER JOIN customer ON rental.customer_id = customer.customer_id INNER JOIN inventory ON rental.inventory_id = inventory.inventory_id INNER JOIN film ON inventory.film_id = film.film_id ORDER BY rental_date DESC LIMIT 10;"