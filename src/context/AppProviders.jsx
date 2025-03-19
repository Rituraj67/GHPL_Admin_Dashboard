// src/context/AppProviders.jsx
import React from "react";
import { AuthProvider } from "./AuthContext";
import { ProductProvider } from "./ProductContext";
import { NewsProvider } from "./NewsContext";
import { ContactProvider } from "./ContactContext";
import { TestimonialProvider } from "./TestimonialContext";
import { AwardProvider } from "./AwardContext";
import { MilestoneProvider } from "./MilestoneContext";
import { DirectorProvider } from "./DirectorContext";
import { CareerProvider } from "./CareerContext";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ProductProvider>
        <NewsProvider>
          <ContactProvider>
            <TestimonialProvider>
              <AwardProvider>
                <MilestoneProvider>
                  <DirectorProvider>
                    <CareerProvider>{children}</CareerProvider>
                  </DirectorProvider>
                </MilestoneProvider>
              </AwardProvider>
            </TestimonialProvider>
          </ContactProvider>
        </NewsProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default AppProviders;
