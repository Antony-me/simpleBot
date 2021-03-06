const _prompt = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const diseases = {
  Syphilis: [
    "A rash on your reproductive organs",
    "Fatigue",
    "Fever",
    "Weight Loss",
    "Hair loss",
    "Joint pain",
  ],

  Chlymydia: [
    "pain or discomfort during sex or urination",
    "green or yellow discharge from the penis or vagina",
    "pain in the lower abdomen",
  ],

  Gonorrhea: [
    "a white, yellow, beige, or green-colored discharge from the penis or vagina",
    "pain or discomfort during sex or urination",
    "more frequent urination than usual",
    "itching around the genitals",
    "sore throat",
  ],
};

function analytics(data) {
  const _diseases = Object.keys(diseases);
  let metrics = {};
  for (let x = 0; x < _diseases.length; x += 1) {
    let occurences = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (diseases[_diseases[x]].indexOf(data[i]) > -1) {
        occurences += 1;
      }
    }

    metrics[_diseases[x]] = occurences;
  }

  const _metricValues = Object.values(metrics);
  const max = Math.max(..._metricValues);
  const min = Math.min(..._metricValues);
  const maxIndex = _metricValues.findIndex((element) => element === max);
  const minIndex = _metricValues.findIndex((element) => element === min);
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  console.log("You final analysis:\n");
  console.log(metrics);

  if (metrics[_diseases[maxIndex]] > 0 && max !== min) {
    console.log(
      `\nYou most likely have ${_diseases[maxIndex]} and ${
        Object.keys(diseases).length > 2 ? "least" : "less"
      } likely have ${_diseases[minIndex]}`
    );
  } else if (max > 0 && max === min) {
    console.log(
      `\nSorry we cannot determine you current ailment. You probably suffer from ${_diseases[maxIndex]}`
    );
  } else {
    console.log(`\nNo Symptom set. You are probably just paranoid...`);
  }
}

function shuffler(diseases) {
  const namespaces = Object.keys(diseases);
  let symptoms = [];

  for (let i = 0; i < namespaces.length; i += 1) {
    symptoms.push(...diseases[namespaces[i]]);
  }

  for (let i = 0; i < symptoms.length; i += 1) {
    let wildCard = Math.floor(Math.random() * (i + 1));

    let temp = symptoms[i];
    symptoms[i] = symptoms[wildCard];
    symptoms[wildCard] = temp;
  }

  symptoms = symptoms.filter(
    (value, index) => symptoms.indexOf(value) === index
  );

  return symptoms;
}

let count = 0;
const symptoms = shuffler(diseases);
const activeSymptoms = [];

function prompt() {
  _prompt.question(`Have you noticed ${symptoms[count]}? `, (answer) => {
    if (
      String(answer).toUpperCase() === "exit".toUpperCase() ||
      count === symptoms.length - 1
    ) {
      _prompt.close();
      return analytics(activeSymptoms);
    } else {
      if (String(answer).toUpperCase() === "Y") {
        activeSymptoms.push(symptoms[count]);
      }

      count += 1;
      prompt();
    }
  });
}

function main() {
  console.log("This is your personal doctor");
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  console.log(
    `Below are some common Symptoms for the diseases ${Object.keys(
      diseases
    ).join(
      ", "
    )}.\nKindly answer the questions with a Y for YES, and Enter for NO to get a complete analysis.\nType exit when you're ready to quit.`
  );
  console.log(
    "-----------------------------------------------------------------------------------"
  );
  prompt();
}

main();
