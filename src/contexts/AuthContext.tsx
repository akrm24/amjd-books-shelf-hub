
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, loginUser, registerUser, logoutUser } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean, error: string | null }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean, error: string | null }>;
  logout: () => Promise<{ success: boolean, error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await loginUser(email, password);
      if (result.error) {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: result.error,
          variant: "destructive",
        });
        return { success: false, error: result.error };
      }
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في AMJD Books",
      });
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await registerUser(email, password, name);
      if (result.error) {
        toast({
          title: "خطأ في إنشاء الحساب",
          description: result.error,
          variant: "destructive",
        });
        return { success: false, error: result.error };
      }
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في AMJD Books",
      });
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const result = await logoutUser();
      if (result.error) {
        toast({
          title: "خطأ في تسجيل الخروج",
          description: result.error,
          variant: "destructive",
        });
        return { success: false, error: result.error };
      }
      toast({
        title: "تم تسجيل الخروج بنجاح",
      });
      return { success: true, error: null };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
