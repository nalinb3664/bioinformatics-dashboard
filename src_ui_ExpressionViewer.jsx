import React, {useEffect, useState} from 'react'
import Plotly from 'plotly.js-basic-dist'

export default function ExpressionViewer(){
  const [datasets,setDatasets] = useState([])
  const [dataset,setDataset] = useState('')
  const [gene, setGene] = useState('TP53')
  const [rows,setRows] = useState([])
  const [logView, setLogView] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:5000/api/datasets')
      .then(r=>r.json())
      .then(data=>{
        setDatasets(Object.keys(data))
        setDataset(Object.keys(data)[0])
      })
  },[])

  useEffect(()=>{
    if(!dataset) return
    setLoading(true)
    fetch(`http://localhost:5000/api/expression/${dataset}`)
      .then(r=>r.json())
      .then(data=>{setRows(data)})
      .finally(()=>setLoading(false))
  },[dataset])

  useEffect(()=>{ draw() }, [rows,gene,logView])

  function draw(){
    if(!rows.length) return
    const selected = rows.filter(r=> r.gene.toLowerCase()===gene.toLowerCase())
    const groups = {}
    selected.forEach(r=>{
      if(!groups[r.condition]) groups[r.condition]=[]
      groups[r.condition].push(logView? Math.log2(r.value+1): r.value)
    })
    const traces = Object.keys(groups).map(cond=> ({ y: groups[cond], type: 'box', name: cond }))
    Plotly.newPlot('expr-plot', traces.length? traces: [{y:[0], type:'box'}], {title:`${gene}`}, {responsive:true})
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 bg-white rounded-lg p-4">
          <label>Dataset</label>
          <select value={dataset} onChange={e=>setDataset(e.target.value)} className="w-full mt-2 p-2 border rounded">
            {datasets.map(d=> <option key={d}>{d}</option>)}
          </select>

          <div className="mt-3">
            <label>Gene</label>
            <input value={gene} onChange={e=>setGene(e.target.value)} className="w-full mt-2 p-2 border rounded" />
          </div>

          <div className="mt-3">
            <label>
              <input type="checkbox" checked={logView} onChange={e=>setLogView(e.target.checked)} /> Log view
            </label>
          </div>
        </aside>

        <main className="w-full lg:w-3/4 bg-white rounded-lg p-4">
          {loading? <p>Loading dataset...</p>: <div id="expr-plot" style={{height:420}}></div>}
        </main>
      </div>
    </div>
  )
}
