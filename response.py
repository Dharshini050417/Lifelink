from transformers import AutoModelForCausalLM, AutoTokenizer

# Load the LLaMA model and tokenizer (update model path with actual model name)
model_name = "decapoda-research/llama-7b-hf"  # Replace with the LLaMA model you're using
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

def classify_and_respond(message, severity_category):
    """
    Classify and respond to the message based on its severity category.
    """
    if severity_category == "severe":
        send_to_helpline(message)
    elif severity_category == "moderate":
        activity_suggestions = generate_activity_suggestions(message)
        return activity_suggestions
    elif severity_category == "mild":
        reassurance_message = generate_reassurance(message)
        return reassurance_message
    else:
        return "Invalid category"

def send_to_helpline(message):
    """
    Logic to send the message to a helpline.
    This can be implemented using SMS, email, or a REST API.
    """
    print(f"SEVERE ALERT: Message sent to helpline: {message}")

def generate_activity_suggestions(message):
    """
    Use LLaMA to dynamically generate activities for moderate distress.
    """
    prompt = f"Suggest helpful activities for someone experiencing moderate emotional distress. Message: {message}"
    response = generate_with_llama(prompt)
    return response

def generate_reassurance(message):
    """
    Use LLaMA to provide emotional reassurance for mild distress.
    """
    prompt = f"Provide a reassuring and supportive message for someone experiencing mild emotional distress. Message: {message}"
    response = generate_with_llama(prompt)
    return response

def generate_with_llama(prompt):
    """
    Generate a response using LLaMA.
    """
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True)
    outputs = model.generate(inputs["input_ids"], max_length=150, num_return_sequences=1, temperature=0.7)
    response = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return response

# Example usage
message = "I feel overwhelmed by everything happening in my life."
severity_category = "moderate"  # Example classification result

response = classify_and_respond(message, severity_category)
print(f"Response: {response}")
