from transformers import DistilBertTokenizer, DistilBertForSequenceClassification
import torch

# Load DistilBERT model and tokenizer
MODEL_NAME = "distilbert-base-uncased"
tokenizer = DistilBertTokenizer.from_pretrained(MODEL_NAME)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=3)

# Labels for classification
LABELS = {0: "Mild Distress", 1: "Moderate Distress", 2: "Severe Distress"}

# Function to classify text
def classify_text(text):
    # Tokenize input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128)
    
    # Get model predictions
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_label = torch.argmax(logits, dim=1).item()
    
    return LABELS[predicted_label]

# Example usage
if __name__ == "__main__":
    # Sample text
    user_input = "I feel sad and lonely. I don't know what to do."
    
    # Classification
    category = classify_text(user_input)
    print(f"Classification: {category}")
