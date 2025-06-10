document.addEventListener('DOMContentLoaded', function() {
    // Helper function to show messages
    function showMessage(message, type) {
        const resultDiv = document.getElementById('resultContainer');
        resultDiv.innerHTML = `<p class="${type}">${message}</p>`;
    }

    // Function to display results
    function displayResults(data) {
        const resultDiv = document.getElementById('resultContainer');
        let html = `
            <h2>Results for ${data.name}</h2>
            <p><strong>Performance Category:</strong> ${data.category}</p>
            <h3>Subject Scores</h3>
            <table style="width:100%; border-collapse: collapse;">
                <tr style="background-color: #e0e0e0;">
                    <th style="padding: 8px; text-align: left;">Subject</th>
                    <th style="padding: 8px; text-align: left;">Score</th>
                    <th style="padding: 8px; text-align: left;">Performance</th>
                </tr>
        `;

        // Add each subject's data
        for (const subject in data.scores) {
            html += `
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${subject}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.scores[subject]}</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.performance[subject]}</td>
                </tr>
            `;
        }

        html += `
            </table>
            <h3 style="margin-top: 20px;">Analysis</h3>
            <p><strong>Strong Areas:</strong> ${data.strong_areas.join(', ') || 'None'}</p>
            <p><strong>Weak Areas:</strong> ${data.weak_areas.join(', ') || 'None'}</p>
            <button id="clearResults" style="margin-top: 15px;">Clear Results</button>
        `;

        resultDiv.innerHTML = html;
        
        // Add event listener to clear button
        document.getElementById('clearResults').addEventListener('click', function() {
            resultDiv.innerHTML = '';
        });
    }

    // Get DOM elements
    const button = document.getElementById('getResultButton');
    const nameInput = document.getElementById('nameInput');

    // Add click event listener
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        
        if (!name) {
            showMessage('Please enter a student name', 'error');
            return;
        }

        try {
            showMessage('Loading results...', 'loading');
            console.log("Fetching results for:", name);
            
            const response = await fetch(`http://localhost:5000/run-ml?name=${encodeURIComponent(name)}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Received data:", data);
            
            displayResults(data);
            
        } catch (error) {
            console.error('Error:', error);
            showMessage(`Error: ${error.message}`, 'error');
        }
    });
});

setTimeout(() => {
    const resultDiv = document.getElementById("resultContainer");
    if (resultDiv) {
        resultDiv.innerHTML = "<p style='color:red;'>Result expired after 1 minute.</p>";
    }
}, 60000);

  