import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  async function opinionAction(preOpinionState, opinionFormData) {
    const userName = opinionFormData.get("userName");
    const title = opinionFormData.get("title");
    const body = opinionFormData.get("body");

    console.log(userName, title, body);

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title is too small");
    }
    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 to 300 characters long.");
    }
    if (!userName.trim()) {
      errors.push("Please provide your name.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValue: {
          userName,
          title,
          body,
        },
      };
    }
    await addOpinion({userName, title, body});
    return { errors: null };
  }

  const [opiFormState, opiFormAction] = useActionState(opinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={opiFormAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={opiFormState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={opiFormState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={opiFormState.enteredValue?.body}
          ></textarea>
        </p>

        {opiFormState.errors && (
          <ul className="errors">
            {opiFormState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
