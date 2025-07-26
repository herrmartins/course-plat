import { getClassTypeModel } from "@/app/models/ClassType";
import React from "react";

async function ClassTypeFilesPage({ params }) {
  const { id: classTypeId } = await params;

  const classTypeModel = await getClassTypeModel();

  try {
    const classType = classTypeModel
      .findById(classTypeId)
      .populate('files')
      .lean();

    if (!classType) {
      return <div>Class Type not found.</div>;
    }

    const files = classType.files;

    return (
      <div>
        <h1>Files for {classType.title}</h1>
        {files && files.length > 0 ? (
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.title} ({file.mimetype})
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No files associated with this Class Type.</p>
        )}
      </div>
    );
  } catch (err) {
    console.error("Error fetching class type and files:", err);
    return <div>Error loading files.</div>;
  }
}

export default ClassTypeFilesPage;