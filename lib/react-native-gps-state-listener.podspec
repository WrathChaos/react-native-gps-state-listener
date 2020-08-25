
Pod::Spec.new do |s|
  s.name         = "react-native-gps-state-listener"
  s.version      = "1.1.8"
  s.summary      = "react-native-gps-state-listener"
  s.description  = "react-native-gps-state-listener Description"
  s.homepage     = "react-native-gps-state-listener"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "freakycoder" => "kurayogun@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/WrathChaos/react-native-gps-state-listener.git", :tag => "master" }
  s.source_files  = "RNGpsStateListener/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  