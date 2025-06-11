import React, { useState, useEffect } from 'react';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AnimatedInput } from './AnimatedInput';
import { AnimatedButton } from './AnimatedButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { loginSchema, LoginFormData } from '../schemas/auth.schema';
import { useLogin } from '../hooks/useLogin';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { 
    login, 
    loading, 
    error, 
    clearError, 
    validationErrors, 
    clearValidationErrors 
  } = useLogin();
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    trigger
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  // Observar cambios en email y password para limpiar errores
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');
  
  // Limpiar errores cuando cambia el formulario
  useEffect(() => {
    if (formError) {
      setFormError(null);
    }
    if (Object.keys(validationErrors).length > 0) {
      clearValidationErrors();
    }
  }, [formError, watchedEmail, watchedPassword, validationErrors, clearValidationErrors]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    clearError();
    setFormError(null);
    clearValidationErrors();
    
    try {      
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result.success && onSuccess) {
        onSuccess();
      } else if (!result.success) {
        setFormError(result.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setFormError('Ha ocurrido un error inesperado');
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setValue(field, value, { shouldValidate: true });
    if (errors[field]) {
      clearErrors(field);
    }
    if (error || formError) {
      clearError();
      setFormError(null);
    }
    if (Object.keys(validationErrors).length > 0) {
      clearValidationErrors();
    }
  };

  const fillAdminCredentials = () => {
    setValue('email', 'admin@nutrizone.com');
    setValue('password', '@adminNutrizone');
    clearErrors();
    clearError();
    setFormError(null);
    clearValidationErrors();
  };

  return (
    <div className="space-y-6 animate-slideIn">
      <div className="text-center">
        <button
          type="button"
          onClick={fillAdminCredentials}
          className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 border border-dashed border-muted-foreground hover:border-primary rounded px-2 py-1"
        >
          📧 Usar credenciales de admin (demo)
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AnimatedInput
          icon={Mail}
          type="email"
          placeholder="Ingresa tu email"
          value={watchedEmail}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email?.message}
          autoComplete="email"
          onBlur={() => trigger('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        
        <AnimatedInput
          icon={Lock}
          placeholder="Ingresa tu contraseña"
          value={watchedPassword}
          onChange={(e) => handleInputChange('password', e.target.value)}
          showPasswordToggle
          error={errors.password?.message}
          autoComplete="current-password"
          onBlur={() => trigger('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
        />

        {(error || formError) && (
          <div className="text-sm text-destructive text-center animate-fadeIn bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error || formError}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked: boolean) => {
                setRememberMe(checked);
                setValue('rememberMe', checked);
              }}
            />
            <Label 
              htmlFor="remember" 
              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors duration-200"
            >
              Recordarme
            </Label>
          </div>
          
        </div>
        
        <AnimatedButton 
          loading={loading} 
          className="w-full"
          type="submit"
        >
          Iniciar Sesión
        </AnimatedButton>
      </form>
      
      <style>{`
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};