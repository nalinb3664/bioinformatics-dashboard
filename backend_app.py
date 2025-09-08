from flask import Flask, jsonify, request, send_from_directory
import random

app = Flask(__name__, static_folder='../dist', static_url_path='/')

# Mock dataset generator
GENES = ["TP53","BRCA1","BRCA2","EGFR","MYC","GAPDH","ACTB"]
CONDITIONS = ["Healthy","Cancer","Treated"]

def generate_expression(n=100):
    rows = []
    for i in range(n):
        gene = random.choice(GENES)
        condition = random.choice(CONDITIONS)
        value = round(abs(random.gauss(10 if condition=="Healthy" else 15, 3)),2)
        rows.append({
            'sample': f"S{i+1}",
            'gene': gene,
            'condition': condition,
            'value': value
        })
    return rows

@app.route('/api/datasets')
def datasets():
    return jsonify({
        'Dataset A': {'samples': 200, 'conditions': CONDITIONS},
        'Dataset B': {'samples': 150, 'conditions': CONDITIONS}
    })

@app.route('/api/expression/<dataset>')
def expression(dataset):
    rows = generate_expression(200)
    return jsonify(rows)

@app.route('/api/parse_vcf', methods=['POST'])
def parse_vcf():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400
    variants = []
    for line in file:
        try:
            line = line.decode('utf-8').strip()
        except Exception:
            continue
        if not line or line.startswith('#'):
            continue
        cols = line.split('\t')
        if len(cols) < 5:
            continue
        chrom, pos, _id, ref, alt = cols[:5]
        impact = 'Moderate'
        gene = 'Unknown'
        info = cols[7] if len(cols) > 7 else ''
        if 'HIGH' in info: impact = 'High'
        if 'LOW' in info: impact = 'Low'
        variants.append({
            'chrom': chrom,
            'pos': pos,
            'ref': ref,
            'alt': alt,
            'impact': impact,
            'gene': gene
        })
    return jsonify(variants)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
