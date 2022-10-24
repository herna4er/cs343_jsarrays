console.log(data);
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards

const courseToCard = ({
  prefix,
  number,
  title,
  url,
  desc,
  prereqs,
  credits,
}) => {
  const prereqLinks = prereqs
    .map((prereq) => `<a href="#" class="card-link">${prereq}</a>`)
    .join();
  const courseTemplate = `<div class="col">
            <div class="card" style="width: 18rem;">
              <h3 class="card-header"><a href="${url}">${title}</a></h3>
              <div class="card-body">
                <h5 class="card-title">${prefix} ${number}</h5>
                <p class="card-text">${desc}</p>
                ${prereqLinks}
                <div class="card-footer text-muted">
                  ${credits}
                </div>
              </div>
            </div>
          </div>`;
  return courseTemplate;
};
const resultsContainer = document.querySelector("#filtered-results");
const courseCards = data.items.map(courseToCard);
resultsContainer.innerHTML = courseCards.join("");
// courseCards.forEach((c) => document.write(c));

// console.log(courseCards);
// document.write(courseCards.join(''))

// 2. maybe we only show those that match the search query?
//

const filterCourseCard = (markup, query) => {
  console.log(markup, query);
  return markup.toLowerCase().includes(query.toLowerCase());
};

const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", (ev) => {
  console.log(ev);
  ev.preventDefault();
  // ev.stopPropagation();
  console.log("query text");
  const searchField = document.querySelector('input[name="query-text"]');
  const queryText = searchField.value;
  console.log(queryText);
  const filteredCourseCards = courseCards.filter((card) =>
    filterCourseCard(card, queryText)
  );
  console.log('filteredCourseCards', filteredCourseCards);
  resultsContainer.innerHTML = filteredCourseCards.join("");

  const count = document.querySelectorAll(".card")
  const class_count = document.getElementById("count");
  class_count.innerText = `${count.length}`;

  const filteredCourses = data.items.filter((card) => resultsContainer.innerHTML.toLowerCase().includes(card.title.toLowerCase()))
  console.log(filteredCourses)

  let sum = 0;
  let total = filteredCourses.reduce((prev,p) => prev + p.credits, sum)
  const credit_hours = document.getElementById("credit-hours");
  credit_hours.innerText = total;



});

// 3. we update the result count and related summary info as we filter

const count = document.querySelectorAll(".card")
const class_count = document.getElementById("count");
class_count.innerText = `${count.length}`;

let sum = 0;
let total = data.items.reduce((prev,p) => prev + p.credits, sum)
const credit_hours = document.getElementById("credit-hours");
credit_hours.innerText = total;
