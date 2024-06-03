import { MdEdit, MdJavascript } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import "./todo.css";
import { useEffect, useState } from "react";
const Todo = () => {
  const [task, settask] = useState("");
  const [date, setdate] = useState("");
  const [des, setdes] = useState("");
  let data = localStorage.getItem("todo")
    ? JSON.parse(localStorage.getItem("todo"))
    : [];
  const [record, setrecord] = useState(data);
  const [editid, seteditid] = useState("");
  const [single, setsingle] = useState("");
  useEffect(() => {
    settask(single.task);
    setdes(single.des);
    setdate(single.date);
  }, [single]);
  const handlesubmit = (e) => {
    e.preventDefault();
    if(!task||!des||!date){
        alert("Task Is Required..")
        return false
    }
    let obj = {
      id: Math.floor(Math.random() * 1000),
      task,
      des,
      date,
      status: "Pending",
    };
    if (editid) {
      let newrecord = [...record];
      let upd = newrecord.map((val) => {
        if (val.id === editid) {
          return {
            ...val,
            task: task,
            des: des,
            date: date,
          };
        }
        return val;
      });
      localStorage.setItem("todo", JSON.stringify(upd));
      setrecord(upd);
      seteditid("");
      setsingle("");
      alert("Update Task");
    } else {
      let alldata = [...record, obj];
      localStorage.setItem("todo", JSON.stringify(alldata));
      setrecord(alldata);
    }

    settask("");
    setdate("");
    setdes("");
  };
  const deletetask = (id) => {
    let d = record.filter((val) => {
      return val.id != id;
    });
    localStorage.setItem("todo", JSON.stringify(d));
    setrecord(d);
    alert("Delete Task");
  };
  const edittask = (id) => {
    let s = record.find((val) => {
      return val.id === id;
    });
    setsingle(s);
    seteditid(id);
  };
  const updatestatus = (id, status) => {
    if (status == "Pending") {
      let upds = record.filter((val) => {
        if (val.id == id) {
          val.status = "Completed";
        }
        return val;
      });
      localStorage.setItem('todo',JSON.stringify(upds))
      setrecord(upds)
      alert("Status Update")
    } else {
      let upds = record.filter((val) => {
        if (val.id == id) {
          val.status = "Pending";
        }
        return val;
      });
      localStorage.setItem('todo',JSON.stringify(upds))
      setrecord(upds)
      alert("Status Update")
    }
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-4 box-main">
            <div className="box">
              <h1>Todo App</h1>
              <div className="input-task">
                <form onSubmit={handlesubmit}>
                  <input
                    type="text"
                    placeholder="Add New Task"
                    onChange={(e) => settask(e.target.value)}
                    value={task || ""}
                  />
                  <input
                    type="text"
                    placeholder="Add Description"
                    onChange={(e) => setdes(e.target.value)}
                    value={des || ""}
                  />
                  <input
                    type="date"
                    className="date"
                    onChange={(e) => setdate(e.target.value)}
                    value={date || ""}
                    style={{cursor:"pointer"}}
                  />
                  {editid ? (
                    <button className="btn btn-success"style={{width:"100%"}}>Edit Task</button>
                  ) : (
                    <button className="btn btn-success"style={{width:"100%"}}>Add Task</button>
                  )}
                </form>
              </div>
              <div className="view-task">
                <h1>Task</h1>
                {record.map((val) => {
                  return (
                    <div className="view-box mt-3" key={val.id}>
                      <h4>{val.task}</h4>
                      <span>{val.date}</span>
                      <h6 className="mt-2">{val.des}</h6>
                      <div className="edit-btn d-flex justify-content-end mt-3">
                        <button
                          className={`btn ${val.status == "Pending" ? `btn-danger` : `btn-success`} me-3 `}
                          onClick={() => updatestatus(val.id, val.status)}
                        >
                          {val.status}
                        </button>
                        <button
                          className="btn btn-success me-3"
                          onClick={() => edittask(val.id)}
                        >
                          <MdEdit />
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deletetask(val.id)}
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Todo;
