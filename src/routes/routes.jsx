import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import Posts from "../pages/Posts";
import Topic from "../pages/Topic";
import Comment from "../pages/Comment";
import UserPage from "../pages/User/UserPage";
import Recruitment from "../pages/Recruitment/Recruitment";
import RecruitmentDetail from "../pages/Recruitment/RecruimentDetail";
import UserDetail from "../pages/User/UserDetail";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <DefaultLayout>
              <HomePage />
            </DefaultLayout>
          }
        />
        <Route
          path="/account"
          element={
            <DefaultLayout>
              <UserPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/account/edit/:id"
          element={
            <DefaultLayout>
              <UserDetail />
            </DefaultLayout>
          }
        />
          <Route
          path="/account/add"
          element={
            <DefaultLayout>
              <UserDetail />
            </DefaultLayout>
          }
        />
        <Route
          path="/posts"
          element={
            <DefaultLayout>
              <Posts />
            </DefaultLayout>
          }
        />
        <Route
          path="/comments"
          element={
            <DefaultLayout>
              <Comment />
            </DefaultLayout>
          }
        />
        <Route
          path="/topic"
          element={
            <DefaultLayout>
              <Topic />
            </DefaultLayout>
          }
        />
        <Route
          path="/recruitment"
          element={
            <DefaultLayout>
              <Recruitment />
            </DefaultLayout>
          }
        />
        <Route
          path="/recruitment/:slug"
          element={
            <DefaultLayout>
              <RecruitmentDetail />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
