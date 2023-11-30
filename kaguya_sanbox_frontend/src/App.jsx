import React from "react";
import './App.css'
import {useState} from "react";
import axios from 'axios'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-c_cpp' // Импорт модуля C/C++
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-cloud9_night'
import 'ace-builds/src-noconflict/snippets/javascript.js'
import 'ace-builds/src-noconflict/snippets/python.js'
import 'ace-builds/src-noconflict/snippets/c_cpp.js'
import 'ace-builds/src-min-noconflict/ext-language_tools.js'

const App = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [args, setArguments] = useState('');
  const[resonse,setResponse]=useState('')
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  const handleArgumentsChange = (e) => {
    setArguments(e.target.value);
  };

  const executeCode = () => {
    const requestData = {
      language:language,
      code: code,
      arguments: args,
      date: (new Date()).toISOString().slice(0, 19),
    };

    axios.post('http://localhost:3000/', requestData)
        .then((response) => {
          setResponse(response.data);
        })
        .catch((error) => {
            setResponse(error.response.data);
        });
  };


  return (
      <div>
        <div>
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>

        </div>
          <div className={"code-editor"}>
        <AceEditor
            mode={language}
            value={code}
            onChange={setCode}
            editorProps={{ $blockScrolling: Infinity }}
            theme={"cloud9_night"}
            fontSize={"24px"}
            style={{ height: '65vh', width: '100%',fontSize:'24px', fontFamily: 'Courier New, monospace'}}

            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
            }}
        />
          </div>
        <textarea value={args} onChange={handleArgumentsChange} placeholder="Введите аргументы, каждый в новой строке" className={"textarea"}/>
        <button className={"button"} onClick={executeCode}>Выполнить</button>
          <div className="terminal">{resonse}</div>
      </div>
  );
};

export default App;
