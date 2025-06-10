from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import json
import os
from sklearn.tree import DecisionTreeClassifier 

app = Flask(__name__)
CORS(app)

def get_performance(score):
    if score == 0:
        return "Bad Performance"
    elif score == 1:
        return "Very Poor"
    elif score == 2:
        return "Poor"
    elif score == 3:
        return "Good"
    elif score == 4:
        return "Better"
    elif score == 5:
        return "Excellent"
    else:
        return "Invalid Score"

@app.route("/")
def home():
    return "✅ Flask server is running! Use /run-ml to trigger ML and /result to view the result."

@app.route("/run-ml", methods=['GET'])
def run_ml_and_return_result():
    name_query = request.args.get('name', '').strip().lower()
    if not name_query:
        return jsonify({"error": "Missing 'name' parameter"}), 400

    sheet_urls = {
        "C": "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8EgP5Uhvyv1g5HJwCqpdXwpMJHoVGTxFuv6rfBNllGWTsqSwaaOugKuXnTvQA8hT-dRreDLCghTaQ/pub?output=csv",
        "CPP": "https://docs.google.com/spreadsheets/d/e/2PACX-1vS_Fv6iKdFYcBrzdESMGsYfwPpMXos2o-srQtxQCNpuIEs8X1MJxjk6A9rpfKKdN1xqA1i2EnGPGVpx/pub?output=csv",
        "Java": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO8SHZrzAitherBZiWKHi2GAppxGkHnZbD7ceD7VlPAyOm0uWp4JmQqAm1GdCuPhmdNi9u7rybxe8h/pub?output=csv",
        "Python": "https://docs.google.com/spreadsheets/d/e/2PACX-1vSQxTeAsp_v5yj_YVSDp7djY_R9KYE1LuW7AvMRhbjqmAgntTLNBVXawPONjPIH9fpV8ThFbeFmDs3E/pub?output=csv"
    }

    scores = {}
    strong_areas = {}
    weak_areas = {}

    for subject, url in sheet_urls.items():
        df = pd.read_csv(url)

        # Normalize column name and values
        name_col = 'Enter the name:' if subject != 'Python' else 'Enter the Name:'
        df[name_col] = df[name_col].astype(str).str.strip().str.lower()

        # Match the student
        matched = df[df[name_col] == name_query]
        if matched.empty:
            return jsonify({"error": f"Student '{name_query}' not found in {subject} sheet."}), 404

        # Assume we take the latest entry if multiple matches
        row = matched.iloc[-1]
        student_name = row[name_col].title()

        score = str(row['Score'])
        score = float(''.join(filter(str.isdigit, score)) or 0)
        scores[subject] = int(score)

        if score <= 3:
            weak_areas[subject] = score
        else:
            strong_areas[subject] = score

    # Dummy ML model
    np.random.seed(42)
    df_train = pd.DataFrame({
        'C': np.random.randint(0, 6, 100),
        'CPP': np.random.randint(0, 6, 100),
        'Java': np.random.randint(0, 6, 100),
        'Python': np.random.randint(0, 6, 100)
    })

    def label_category(row):
        avg = sum(row) / 4
        if avg >= 4.5:
            return "Intelligent"
        elif avg >= 3.5:
            return "Above Average"
        elif avg >= 2.5:
            return "Average"
        elif avg >= 1.5:
            return "Below Average"
        else:
            return "Weak"

    df_train['Category'] = df_train.apply(label_category, axis=1)

    X = df_train[['C', 'CPP', 'Java', 'Python']]
    y = df_train['Category']
    model = DecisionTreeClassifier()
    model.fit(X, y)

    latest_scores = [[scores['C'], scores['CPP'], scores['Java'], scores['Python']]]
    predicted_category = model.predict(latest_scores)[0]

    result = {
        "name": student_name,
        "scores": scores,
        "performance": {sub: get_performance(s) for sub, s in scores.items()},
        "category": predicted_category,
        "strong_areas": list(strong_areas.keys()),
        "weak_areas": list(weak_areas.keys())
    }

    with open("student_result.json", "w") as f:
        json.dump(result, f, indent=4)

    return jsonify(result)

@app.route("/result", methods=['GET'])
def result():
    if not os.path.exists("student_result.json"):
        return jsonify({"error": "No result file found. Please run /run-ml first."}), 404
    with open("student_result.json", "r") as f:
        data = json.load(f)
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)
