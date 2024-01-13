import React from 'react';
import Alert from './component/ui/Alert/Alert';
import AddAlertIcon from '@mui/icons-material/AddAlert';

function App() {


  return (
    <div className="App">
       <Alert type={"alert-default"} icon={<AddAlertIcon/>} title={"Upgrade your plan"}>
        {<p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur temporibus doloremque{" "}
          <a href="/">laboriosam</a> iste totam officiis beatae quas.
        </p>}
        </Alert>
             <Alert
          type={"alert-info"}
          title={"Alert"}
          icon={<AddAlertIcon/>}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit
          Vitae, adipisci!Aperiam, recusandae officia
            animi eligendi dicta perferendis maxime in itaque!"/>

             <Alert
          type={"alert-warning"}
          title={"Alert"}
          icon={<AddAlertIcon/>}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit
          Vitae, adipisci!Aperiam, recusandae officia
            animi eligendi dicta perferendis maxime in itaque!"/>
             <Alert
          type={"alert-error"}
          title={"Alert"}
          icon={<AddAlertIcon/>}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit
          Vitae, adipisci!Aperiam, recusandae officia
            animi eligendi dicta perferendis maxime in itaque!"/>
             <Alert
          type={"alert-success"}
          title={"Alert"}
          icon={<AddAlertIcon/>}
          description="Lorem ipsum dolor, sit amet consectetur adipisicing elit
          Vitae, adipisci!Aperiam, recusandae officia
            animi eligendi dicta perferendis maxime in itaque!"/>
    </div>
  );
}

export default App;
