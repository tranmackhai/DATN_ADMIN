import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HomePage from "../pages/HomePage";
import Posts from "../pages/Forum/Post/Posts";
import Topic from "../pages/Forum/Topic/Topic";
import Comment from "../pages/Comment";
import UserPage from "../pages/User/UserPage";
import Recruitment from "../pages/Recruitment/Recruitment";
import RecruitmentDetail from "../pages/Recruitment/RecruimentDetail";
import UserDetail from "../pages/User/UserDetail";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import ScientificResearch from "../pages/ScientificResearch/ScientificResearch";
import ScientificResearchDetail from "../pages/ScientificResearch/ScientificResearchDetail";
import Login from "../pages/Login/Login";
import AuthAdmin from "../components/common/AuthAdmin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <HomePage />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/account"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <UserPage />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/account/edit/:id"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <UserDetail />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/account/add"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <UserDetail />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/posts"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <Posts />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/comments"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <Comment />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/topic"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <Topic />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/recruitment"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <Recruitment />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/recruitment/:slug"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <RecruitmentDetail />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/news"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <News />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/news/:slug"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <NewsDetail />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/scientific-research"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <ScientificResearch />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/scientific-research/:slug"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <ScientificResearchDetail />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
