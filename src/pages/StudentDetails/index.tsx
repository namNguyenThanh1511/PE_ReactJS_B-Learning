import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Student } from "../../model/student";
import api from "../../config/api/axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";

function StudentDetailsPage() {
  const [student, setStudent] = useState<Student>();
  const { id } = useParams();
  const fetchStudent = async () => {
    try {
      const response = await api.get(`StudentManagement/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudent();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 300 }} cover={<img alt="example" src={student?.image} />}>
        <p>
          <strong>ID</strong> :{student?.id}
        </p>
        <Meta
          title={
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{student?.name}</span>
              <span>{student?.class}</span>
            </p>
          }
        />
        <p>
          <strong>Gender : </strong>
          {student?.gender ? "male" : "female"}
        </p>
        <p>
          <strong>Date of birth : </strong>
          {student?.dateofbirth}
        </p>
        <p style={{ textAlign: "center" }}>
          <h1>Feedback : </h1>
          {student?.feedback}
        </p>
      </Card>
    </div>
  );
}

export default StudentDetailsPage;
