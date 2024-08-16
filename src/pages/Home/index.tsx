import React, { useEffect, useState } from "react";
import api from "../../config/api/axios";
import { Student } from "../../model/student";
import CardComponent from "../../component/card";

export default function Home() {
  const [students, setStudents] = useState<Student[]>();
  const fetchStudents = async () => {
    try {
      const response = await api.get("StudentManagement");

      setStudents(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "20px",
        margin: "0 auto",
        gap: "20px",
      }}
    >
      {students?.map((student: Student) => (
        <CardComponent key={student.id} student={student} />
      ))}
    </div>
  );
}
