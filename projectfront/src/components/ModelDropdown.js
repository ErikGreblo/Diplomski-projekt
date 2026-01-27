function ModelDropdown({ value, onChange }) {
  return (
    <select className={"dropdown-model"} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="ollama">Ollama (local)</option>
      <option value="openai">ChatGPT (OpenAI)</option>
    </select>
  );
}

export default ModelDropdown;