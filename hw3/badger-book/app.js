/**
 *
 * You may find the helper functions helpful.
 */
fetch("https://cs571.org/s23/hw3/api/students",{
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_7d85b4cff564a5dc11dd"
	}
}).then(response => response.json()).then(data => {
	document.getElementById("students").innerHTML = buildStudentsHtml(data);
});

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<strong>${stud.major}</strong>`;
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin ? "is" : "is not"} from Wisconsin.</p>`;
	html += `<p> They have ${stud.interests.length} interests including...</p><ul>`;
	html += stud.interests.map(interest => `<li>${interest}</li>`).join("\n");
	html += `</ul></div>`
	return html;
}
