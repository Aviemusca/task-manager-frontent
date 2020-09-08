import React from "react";
import { LabelBox, NumberLabel } from "./labels";
import { taskStatuses } from "../../taskOptions";

const TaskInfoContainer = ({ tasks, bgColor }) => {
  const getNumTasks = (state) =>
    tasks.reduce(
      (total, task) => (task.state === state ? total + 1 : total),
      0
    );

  return (
    <TaskInfo
      tasks={tasks}
      taskNums={[getNumTasks(2), getNumTasks(1), getNumTasks(0)]}
      bgColor={bgColor}
    />
  );
};
const TaskInfo = ({ tasks, taskNums, bgColor }) => {
  return (
    <LabelBox
      title="Tasks"
      style={{ display: "inline-block" }}
      bgColor={bgColor}
    >
      <NumberLabel popup="Total" number={tasks.length} />
      {taskStatuses
        .slice(0)
        .reverse()
        .map((status, index) => {
          return (
            <NumberLabel
              popup={status.popupContent}
              color={status.color}
              number={taskNums[index]}
            />
          );
        })}
    </LabelBox>
  );
};

export default TaskInfoContainer;
