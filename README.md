# cs465-fullstack
CS-465 Full Stack Development with MEAN
--------------------------------------------------------------------------------------------------------------------------------
Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).
ANSWER: Express serve as static HTML pages and client side JavaScript without having a frontend framework. javaScript with express uses a plain javaScript to send AJAX requestr to an express REST API. SPA involve angular handles and UI rendering on the client side. The application fetches data via REST API and updates the UI. 
--------------------------------------------------------------------------------------------------------------------------------
Why did the backend use a NoSQL MongoDB database?
ANSWER: The database used NoSQL because it is a more efficient when querying. It is also more scalable so they can handle databases that are larger or ones that are going to grow.
--------------------------------------------------------------------------------------------------------------------------------
How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces?
ANSWER: JSON is text-based vs javascript being a programming language. Json is also primarily used for storing and transferring data. with Javascript being used for frontend and backend programming. Json acts as a path way between Angular and Express wuth MongoDB. Data is exchanged through API calls.
--------------------------------------------------------------------------------------------------------------------------------
Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.
ANSWER: Examples
getTrips() {
  return this.http.get<Trip[]>('http://localhost:3000/api/trips');
}
getTrip(tripCode: string) {
  return this.http.get<Trip>(`http://localhost:3000/api/trips/${tripCode}`);
}

being refactored into this 

fetchData<T>(endpoint: string): Observable<T> {
  return this.http.get<T>(`${this.baseUrl}/${endpoint}`);
}
--------------------------------------------------------------------------------------------------------------------------------
Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.
ANSWER: Methods are things like GET, POST, PUT, and DELETE. GET is used to retrieve data(/api/trips), POST is used to create new data(/api/trips), PUT updates existing data(/api/trips/:tripCode), and Delete is used to remove existing data(/api/trips/:tripCode). Security involved checking for authentication, authorization, and input validation.for example
--
test('GET /api/trips requires authentication', async () => {
    const response = await request(app).get('/api/trips');
    expect(response.status).toBe(401); // Unauthorized
});
--------------------------------------------------------------------------------------------------------------------------------
