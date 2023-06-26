import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthAdmin from "../components/common/AuthAdmin";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Comment from "../pages/Comment";
import Category from "../pages/Forum/Category/Category";
import FormAddCategory from "../pages/Forum/Category/FormAddCategory";
import Posts from "../pages/Forum/Posts/Posts";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login/Login";
import News from "../pages/News/News";
import NewsDetail from "../pages/News/NewsDetail";
import RecruitmentDetail from "../pages/Recruitment/RecruimentDetail";
import Recruitment from "../pages/Recruitment/Recruitment";
import ScientificResearch from "../pages/ScientificResearch/ScientificResearch";
import ScientificResearchDetail from "../pages/ScientificResearch/ScientificResearchDetail";
import UserDetail from "../pages/User/UserDetail";
import UserPage from "../pages/User/UserPage";
import FormAddPosts from "../pages/Forum/Posts/FormAddPosts";
import FormUpdateCategory from "../pages/Forum/Category/FormUpdateCategory";

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
          path="/posts/add"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <FormAddPosts />
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
          path="/category"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <Category />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/category/add"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <FormAddCategory />
              </DefaultLayout>
            </AuthAdmin>
          }
        />
        <Route
          path="/topic/:slug"
          element={
            <AuthAdmin>
              <DefaultLayout>
                <FormUpdateCategory />
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
