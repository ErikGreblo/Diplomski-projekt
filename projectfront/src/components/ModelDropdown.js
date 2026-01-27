function ModelDropdown({ value, onChange }) {
  return (
    <select className={"dropdown-model"} value={value} onChange={(e) => onChange(e.target.value)}>
      <option className={"dropdown-model-option"} value="ollama">Ollama (local)</option>
      <option className={"dropdown-model-option"} value="openai">ChatGPT (OpenAI)</option>
    </select>
  );
}

export default ModelDropdown;