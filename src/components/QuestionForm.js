import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Remove any empty answers before sending the form data
    const answers = formData.answers.filter((answer) => answer.trim() !== "");
    const newQuestion = { ...formData, answers };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new question to the list of questions in state
        // This is left as an exercise for you to implement
      });

    // Reset the form data
    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        <label>
          Answer 1:
          <input type="text" name="answers" value={formData.answers[0]} onChange={handleChange} />
        </label>
        <label>
          Answer 2:
          <input type="text" name="answers" value={formData.answers[1]} onChange={handleChange} />
        </label>
        <label>
          Answer 3:
          <input type="text" name="answers" value={formData.answers[2]} onChange={handleChange} />
        </label>
        <label>
          Answer 4:
          <input type="text" name="answers" value={formData.answers[3]} onChange={handleChange} />
        </label>
        <label>
          Correct Answer:
          <select name="correctIndex" value={formData.correctIndex} onChange={handleChange}>
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>
                {answer}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
