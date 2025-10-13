import gradio as gr
from llama_cpp import Llama
import os

# ✅ Disable parallel tokenizers (avoids crash on Mac)
os.environ["TOKENIZERS_PARALLELISM"] = "false"

# ✅ Load TinyLlama GGUF model
llm = Llama(
    model_path="/Users/hannahjoshua/Documents/GitHub/Mind-Haven 2/CBT/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf",  # update if your path differs
    n_ctx=2048,
    n_threads=4,
    n_gpu_layers=1,           # Speeds up inference on Mac M1
    use_mlock=False,
    verbose=True
)

# 🧠 Prompt template (TinyLlama follows chat format)
def reframe_thought(thought):
    prompt = f"""<|system|>
You are a compassionate CBT therapist helping users reframe negative automatic thoughts into kind, balanced, and realistic alternatives.
<|user|>
Reframe this thought: "{thought}"
<|assistant|>"""

    try:
        output = llm(
            prompt=prompt,
            max_tokens=100,
            temperature=0.7,
            stop=["<|user|>", "<|system|>"]
        )
        return output["choices"][0]["text"].strip()
    except Exception as e:
        return f"⚠️ Error: {str(e)}"

# 🖼️ Gradio UI
with gr.Blocks(title="CBT Thought Reframer") as demo:
    gr.Markdown("## 💭 CBT Thought Reframer")
    with gr.Row():
        with gr.Column():
            user_input = gr.Textbox(label="🧠 Your Negative Thought", placeholder="e.g. I'm such a failure")
            submit = gr.Button("Submit")
        with gr.Column():
            output = gr.Textbox(label="💡 Reframed Thought")

    submit.click(fn=reframe_thought, inputs=user_input, outputs=output)

# 🚀 Launch app
demo.launch()