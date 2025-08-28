"use client"
import React from "react";
import {ClassCard} from "@/app/(protected)/components/shared/ClassCard";
import {ClassCardComponent} from "@/app/(protected)/components/shared/ClassCardsComponent";

function StudentDashboard({classes = []}) {

  return (
    <>
      <div>
          {!!classes && classes.length > 0 && (
              <ClassCardComponent classes={classes} hrefBase="/dashboard/student/class/" />
          )}
      </div>
    </>
  );
}

export default StudentDashboard;
