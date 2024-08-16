import { Button, DatePicker, Form, Image, Input, Modal, Popconfirm, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../../config/api/axios";
import { Student } from "../../../model/student";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import { toast } from "react-toastify";

function StudentsMNGPage() {
  const [students, setStudents] = useState<Student[]>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [isUpdate, setIsUpdate] = useState(false);
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
  const columns = [
    {
      title: "name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Date of birth",
      key: "dateofbirth",
      dataIndex: "dateofbirth",
    },
    {
      title: "gender",
      key: "gender",
      dataIndex: "gender",
      render: (gender: boolean) => {
        return <>{gender === true ? "Male" : "Female"}</>;
      },
    },
    {
      title: "class",
      key: "class",
      dataIndex: "class",
    },
    {
      title: "image",
      key: "image",
      dataIndex: "image",
      render: (image: string) => {
        return <Image width={200} src={image} />;
      },
    },
    {
      title: "feedback",
      key: "feedback",
      dataIndex: "feedback",
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (id, record) => {
        return (
          <>
            <Button
              onClick={() => {
                // báo lỗi nếu không validate lại data của antd
                const recordValidate = {
                  ...record,
                  dateofbirth: record.dateofbirth ? moment(record.dateofbirth, "YYYY-MM-DD") : null,
                };
                form.setFieldsValue(recordValidate); // get data from current record
                setIsUpdate(true);
                handleOpenModal();
              }}
              type="primary"
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this student ? "
              onConfirm={() => handleDeleteStudent(id)}
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleSubmitForm = async (values) => {
    console.log(values);
    try {
      const formattedDate = moment().format("YYYY-MM-DD");
      values.dateofbirth = formattedDate;
      if (values.id !== null) {
        // id exist -> update
        // values ?.id => values.id not null
        await api.put(`StudentManagement/${values.id}`, values);
        toast.success("Updated successfully");
      } else {
        //id non exist -> create
        await api.post("StudentManagement", values);
        toast.success("Add new student successfully");
      }

      fetchStudents();
      form.resetFields();
      handleCloseModal();
    } catch (error) {
      toast.error("Add new student failed");
      console.log(error);
    }
  };
  const handleDeleteStudent = async (id: string) => {
    try {
      await api.delete(`StudentManagement/${id}`);
      toast.success("Deleted successfully");
      fetchStudents();
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };
  return (
    <div>
      <Button
        onClick={() => {
          setIsUpdate(false);
          handleOpenModal();
        }}
        type="primary"
      >
        Add new student
      </Button>
      <Table columns={columns} dataSource={students} />
      <Modal
        title={isUpdate ? "Edit student" : "Add new student"}
        open={isOpenModal}
        onCancel={handleCloseModal}
        onOk={() => {
          form.submit();
        }}
      >
        <Form onFinish={handleSubmitForm} form={form} labelCol={{ span: 24 }}>
          <Form.Item name={"id"}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            label="Enter name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Enter date of birth"
            name="dateofbirth"
            rules={[
              {
                required: true,
                message: "Please input date of birth",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Enter gender"
            name="gender"
            rules={[
              {
                required: true,
                message: "Please input gender",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: true,
                  label: "Male",
                },
                {
                  value: false,
                  label: "Female",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="Enter class"
            name="class"
            rules={[
              {
                required: true,
                message: "Please input class",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Enter image "
            name="image"
            rules={[
              {
                required: true,
                message: "Please input image link",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Enter feedback" name="feedback">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StudentsMNGPage;
