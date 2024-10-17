import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aoujvmkvxwgueosejxfd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvdWp2bWt2eHdndWVvc2VqeGZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMzQ3NjksImV4cCI6MjA0NDcxMDc2OX0.mBJI8wXYCJjlzVMUiT7XbV_nd0r5c7Q3I2rjsognQL4';

export const supabase = createClient(supabaseUrl, supabaseKey);