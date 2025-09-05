1. Generate a file for the repo
2. Generate a file for the figma stuff
3. Here's a screenshot from asking figma's mcp
4. Drag all the files as needed for context when asking questions

Don't try to perfect anything
Add the screenshots as context

After we get that far -> brainstorm on improvements

---

projects/demo/src/app/components - Showcasing for each component

projects/zap/forms
projects/zap/core - Component definitions

// Prompts below

---

Gather a information of all components that are listed in `projects/zap/core` and `projects/zap/forms`.

For each component I want:

1. Component name
2. Component selector(s)
3. relative path to component definition in `projects/zap/core` or `projects/zap/forms`
4. relative path to its demo component in `projects/demo/src/app/components` if it exists
5. Short summary of component

Export a markdown that lists this information in `ai-stuff/01-selectors.json`

I want the following json array with the following schema:

```
{
  selector: <COMPONENT_SELECTOR>,
  path: <projects/zap/core or projects/zap/forms based path to implementation>,
  demo: <projects/demo/src/app/components path if it exists, if not, null>,
  summary: <short summary>
}
```

---

For this prompt a component is a collection or one or more selectors.

Read information from `ai-stuff/01-selectors.json` and reference `projects/zap/core`, `projects/zap/forms`, and `projects/demo/src/app/components` to understand which selectors are expected to be used together to form a single component. For each component, come up with a name based on its folder structure and the common parts of all the selectors. Also include a summary of this component.

Export `ai-stuff/02-components.json` with the following schema:

```
{
  component: <COMPONENT_NAME>,
  selectors: [<COMPONENT_SELECTOR_1>, <COMPONENT_SELECTOR_2>, ...],
  summary: <short summary>
}
```

---

Read the list of selectors from `ai-stuff/01-selectors.json` and list of components from `ai-stuff/02-components.json`

Based on this list, look through `projects/zap/core` or `projects/zap/forms` to consider what input binds are available for each component's selector(s) and what possible values for each. Then summarize how these input binds change the appearance of the overall component and also look through `projects/demo/src/app/components` for more information.

Create separate lists for each component by their selector. For each component, list the following:

1. List each selector and its input
2. List possible values for that input. Flag if a value has a finite possible values or is not bound like a string union type vs string
3. Summarize how that input changes the appearance of that component

Export a json array that lists this information for all component selector and input bind pairing in `ai-stuff/03-inputs.json`

```
{
  component: <COMPONENT_NAME>
  selectors: {
    <COMPONENT_SELECTOR>: {
      <INPUT_BIND_NAME>: {
        value: [<VALUE_1>, <VALUE-2>, ...] or [true, false] for boolean or string or number or unknown or any
        summary: <short summary>
      }
    }
  },
}
```

---

For each

component list
input bind behavior list

figma component set variants list

map figma component -> implementation
