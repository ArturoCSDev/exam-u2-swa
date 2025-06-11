import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, AlertCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AnimatedInput } from './AnimatedInput';
import { AnimatedButton } from './AnimatedButton';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { registerSchema, RegisterFormData, validatePassword } from '../schemas/auth.schema';
import { useRegister } from '../hooks/useRegister';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { 
    register: registerUser, 
    loading, 
    error, 
    clearError, 
    isEmailTaken,
    validationErrors,
    clearValidationErrors 
  } = useRegister();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    setError,
    trigger
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');
  
  // Limpiar errores cuando cambia el formulario
  useEffect(() => {
    if (formError) {
      setFormError(null);
    }
    if (Object.keys(validationErrors).length > 0) {
      clearValidationErrors();
    }
  }, [formError, watchedName, watchedEmail, watchedPassword, watchedConfirmPassword, validationErrors, clearValidationErrors]);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    clearError();
    setFormError(null);
    clearValidationErrors();
    
    // Verificar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { 
        type: 'manual', 
        message: 'Las contraseñas no coinciden' 
      });
      return;
    }

    try {
      const result = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (result.success && onSuccess) {
        onSuccess();
      } else if (!result.success) {
        setFormError(result.error || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setFormError('Ha ocurrido un error inesperado');
    }
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string | boolean) => {
    // Tipado seguro para setValue
    if (typeof value === 'boolean') {
      setValue(field as 'acceptTerms', value, { shouldValidate: true });
    } else {
      setValue(field as 'name' | 'email' | 'password' | 'confirmPassword', value, { shouldValidate: true });
    }
    
    if (field === 'password') {
      setShowPasswordStrength(typeof value === 'string' && value.length > 0);
    }
    
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

  const handleEmailBlur = () => {
    const email = watchedEmail;
    if (email && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && isEmailTaken(email)) {
      setError('email', { 
        type: 'manual', 
        message: 'Este email ya está registrado' 
      });
    }
  };

  const passwordStrength = watchedPassword ? validatePassword(watchedPassword) : null;

  return (
    <div className="space-y-6 animate-slideIn">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AnimatedInput
          icon={User}
          placeholder="Ingresa tu nombre completo"
          value={watchedName}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name?.message}
          autoComplete="name"
          onBlur={() => trigger('name')}
          aria-invalid={errors.name ? 'true' : 'false'}
        />
        
        <AnimatedInput
          icon={Mail}
          type="email"
          placeholder="Ingresa tu email"
          value={watchedEmail}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={() => {
            handleEmailBlur();
            trigger('email');
          }}
          error={errors.email?.message}
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        
        <div className="space-y-2">
          <AnimatedInput
            icon={Lock}
            placeholder="Crea una contraseña"
            value={watchedPassword}
            onChange={(e) => handleInputChange('password', e.target.value)}
            showPasswordToggle
            error={errors.password?.message}
            autoComplete="new-password"
            onBlur={() => trigger('password')}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          
          {showPasswordStrength && passwordStrength && (
            <div className="space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Fortaleza:</span>
                <span className={`font-medium ${passwordStrength.color}`}>
                  {passwordStrength.level === 'weak' && 'Débil'}
                  {passwordStrength.level === 'medium' && 'Media'}
                  {passwordStrength.level === 'strong' && 'Fuerte'}
                </span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    passwordStrength.level === 'weak' ? 'bg-red-500 w-1/3' :
                    passwordStrength.level === 'medium' ? 'bg-yellow-500 w-2/3' :
                    'bg-green-500 w-full'
                  }`}
                />
              </div>
            </div>
          )}
        </div>
        
        <AnimatedInput
          icon={Lock}
          placeholder="Confirma tu contraseña"
          value={watchedConfirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          showPasswordToggle
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
          onBlur={() => trigger('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
        />

        {(error || formError) && (
          <div className="text-sm text-destructive text-center animate-fadeIn bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-center justify-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{error || formError}</span>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 rounded-lg border border-primary/20 shadow-sm">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked: boolean) => {
                  setAcceptTerms(checked);
                  setValue('acceptTerms', checked);
                  if (errors.acceptTerms) {
                    clearErrors('acceptTerms');
                  }
                }}
                className="mt-0.5 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <div className="space-y-1">
                <Label 
                  htmlFor="terms" 
                  className="text-sm font-medium cursor-pointer hover:text-primary transition-colors duration-200"
                >
                  Acepto los términos legales
                </Label>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Al registrarte, aceptas nuestros{' '}
                  <button 
                    type="button" 
                    className="text-primary font-medium hover:text-primary/80 transition-colors duration-200 hover:underline inline-flex items-center gap-0.5"
                    onClick={() => alert('Términos y condiciones (demo)')}
                  >
                    términos y condiciones
                  </button>
                  {' '}y nuestra{' '}
                  <button 
                    type="button" 
                    className="text-primary font-medium hover:text-primary/80 transition-colors duration-200 hover:underline inline-flex items-center gap-0.5"
                    onClick={() => alert('Política de privacidad (demo)')}
                  >
                    política de privacidad
                  </button>
                </p>
              </div>
            </div>
            
            {errors.acceptTerms && (
              <p className="text-sm text-destructive animate-fadeIn mt-2 flex items-center gap-1">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.acceptTerms.message}</span>
              </p>
            )}
          </div>
        </div>
        
        <AnimatedButton 
          loading={loading} 
          className="w-full"
          type="submit"
        >
          Crear Cuenta
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