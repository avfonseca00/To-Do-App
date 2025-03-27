import { Button, Container, Flex, Heading, HStack, Input, Separator, Text, VStack } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useForm } from "react-hook-form"
import {useNavigate} from 'react-router';
import { RiGoogleFill } from "react-icons/ri"
import { PasswordInput } from "@/components/ui/password-input"
import axios from "axios"
import { toaster, Toaster } from "@/components/ui/toaster"
import AuthLayout from "@/layouts/authLayout"
import { useState } from "react";
import { storeSession } from "@/utils/session";

interface FormValues {
  email: string
  password: string 
}

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onSubmit = handleSubmit(async(data) => {

    // console.log(data)
    try {
      setLoading(true)
      const response = await axios.post('http://127.0.0.1:5000/api/auth/login', data)
      console.log(response)
      storeSession(response.data.data.token)
      setTimeout(() => {
        setLoading(false)
        toaster.create({
          title: response.data.message,
          type: 'success',
        })
      }, 2000);
      setTimeout(() => {
        navigate(`/dashboard/${response.data.data.user._id}`);
      }, 3000);
    } catch (error) {
      console.log(error)
      setLoading(false)
      const e = error.response.data.message
      return toaster.create({
        title: e,
        type: 'error',
      }) 
    }

  });

  return (
    <AuthLayout>
      <Flex flex={1.2} justify={"center"} paddingBlock={{base: 24, md: 32}}>
        <Container paddingInline={{base: 4, md: 6, lg: 8}} maxW={'md'}>
          <VStack gap={8}>
            <VStack gap={2}>
              <Heading size={{base: '2xl', md:'3xl'}}>Sign in</Heading>
              <Text color={'fg.muted'}>Sign in to your session</Text>
            </VStack>
            <form onSubmit={onSubmit}>
              <VStack gap={6}>
                <VStack gap={5} w={'100%'}>
                  <Field
                    label="Email"
                    invalid={!!errors.email}
                    errorText={errors.email?.message}
                  >
                    <Input size={'xl'} placeholder="Type your account email here"
                      {...register("email", { required: "Email is required" })}
                    />
                  </Field>
                  <Field
                    label="Password"
                    invalid={!!errors.password}
                    errorText={errors.password?.message}
                  >
                    <PasswordInput size={'xl'} placeholder="Type your account password"
                      {...register("password", { required: "Password is required" })}
                    />
                  </Field>
                </VStack>
                <VStack gap={4} w={'100%'}>
                  <Button w={'100%'} size={'xl'} type="submit" loading={loading} loadingText='Verifying...'>Sign in</Button >
                  <Text>Don't you have an account? <a className="link" href="/register">Sign up</a></Text>
                  <HStack w={'100%'}>
                    <Separator flex="1" />
                    <Text flexShrink="0">Or</Text>
                    <Separator flex="1" />
                  </HStack>
                  <Button w={'100%'} size={'xl'} variant={'outline'} ><RiGoogleFill/>Continue with Google</Button >
                </VStack>
              </VStack>
            </form>
          </VStack>
        </Container>
      <Toaster/>
    </Flex>
    </AuthLayout>
  )
}

export default Login